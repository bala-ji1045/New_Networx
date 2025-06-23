// src/api/recommend.ts

export interface RecommendRequest {
  Age: number;
  Gender: string;
  Location: string;
  Income: number;
  Interests: string;
  Total_Spending: number;
  Product_Category_Preference: string;
  Time_Spent_on_Site_Minutes: number;
}

export interface RecommendResponseItem {
  Name: string;
  User_ID: string;
  Age: number;
  Gender: string;
  Location: string;
  Interests: string;
  "Similarity (%)": number;
}

export async function fetchRecommendations(data: RecommendRequest): Promise<RecommendResponseItem[]> {
  const response = await fetch('https://networx-s5t9.onrender.com/recommend', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }
  return response.json();
}
