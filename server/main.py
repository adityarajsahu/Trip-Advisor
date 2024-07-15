from fastapi import FastAPI
from pydantic import BaseModel
from langchain_core.messages import AIMessage, HumanMessage
from langchain_community.llms import HuggingFaceEndpoint
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from decouple import config

API_TOKEN = config("API_TOKEN")
REPO_ID = "mistralai/Mixtral-8x7B-Instruct-v0.1"
TASK = "text-generation"

app = FastAPI()

template = """
You are Trip Advisor AI, a travel assistant chatbot designed to help users plan their trips and provide travel-related information. You should handle the following scenarios effectively:

1. Booking Flights:
   - Assist users with booking flights to their desired destinations.
   - Ask for departure city, destination city, travel dates, and any specific preferences (e.g., direct flights, airline preferences).
   - Check available airlines and book the tickets accordingly.

2. Booking Hotels:
   - Help users find and book accommodations.
   - Inquire about city or region, check-in/check-out dates, number of guests, and accommodation preferences (e.g., budget, amenities).

3. Booking Rental Cars:
   - Facilitate the booking of rental cars for travel convenience.
   - Gather details such as pickup/drop-off locations, dates, car preferences (e.g., size, type), and any additional requirements.

4. Destination Information:
   - Provide information about popular travel destinations.
   - Offer insights on attractions, local cuisine, cultural highlights, weather conditions, and best times to visit.

5. Travel Tips:
   - Offer practical travel tips and advice.
   - Topics may include packing essentials, visa requirements, currency exchange, local customs, and safety tips.

6. Weather Updates:
   - Give current weather updates for specific destinations or regions.
   - Include temperature forecasts, precipitation chances, and any weather advisories.

7. Local Attractions:
   - Suggest local attractions and points of interest based on the user's destination.
   - Highlight must-see landmarks, museums, parks, and recreational activities.

8. Customer Service:
   - Address customer service inquiries and provide assistance with travel-related issues.
   - Handle queries about bookings, cancellations, refunds, and general support.

Ensure responses are informative, accurate, and tailored to the user's queries and preferences. Use natural language to engage users and provide a seamless experience throughout their travel planning journey.

Chat history:
{chat_history}

User question:
{user_query}
"""

prompt = ChatPromptTemplate.from_template(template)

chat_history = [AIMessage(content = "Hello! I am Trip Advisor AI. How can I help you?")]

def get_response(user_query, chat_history):
    llm = HuggingFaceEndpoint(
        huggingfacehub_api_token = API_TOKEN, 
        repo_id = REPO_ID, 
        task = TASK
    )
    chain = prompt | llm | StrOutputParser()
    response = chain.invoke({
        "chat_history": chat_history,
        "user_query": user_query
    })

    return response

@app.get("/")
def home():
    return {"message": "Hello! I am Trip Advisor AI. How can I help you?"}

class UserQueryRequest(BaseModel):
    user_query: str

@app.post("/")
def generate_response(request: UserQueryRequest):
    user_query = request.user_query
    chat_history.append(HumanMessage(content = user_query))

    response = get_response(user_query, chat_history)
    response = response.replace(user_query, "").replace("How should the AI respond?", "").replace("AI Response:", "").replace("AI:", "").replace("Chatbot response:", "").replace("Bot response:", "").replace("Bot:", "").replace("Chatbot:", "").replace("AI Assistant:", "").strip()
    chat_history.append(AIMessage(content = response))

    return {"message": response}