export type AiItineraryRequest = {
  durationDays: number;
  arrivalCity: string;
  interests: string[];
  budgetLevel: string;
};

export async function generateAiItinerary(request: AiItineraryRequest) {
  void request;
  // Future integration point: connect a trip-planning model and persist results
  // after editorial review.
  throw new Error("AI itinerary generation is not configured yet.");
}
