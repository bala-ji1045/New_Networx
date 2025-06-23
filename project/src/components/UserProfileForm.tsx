import React, { useState } from 'react';
import { User, MapPin, DollarSign, Heart, ShoppingCart, Clock, Loader2, Search } from 'lucide-react';
import { fetchRecommendations, RecommendResponseItem } from '../api/recommend';

interface UserProfile {
  Age: number;
  Gender: string;
  Location: string;
  Income: number;
  Interests: string;
  Total_Spending: number;
  Product_Category_Preference: string;
  Time_Spent_on_Site_Minutes: number;
}

interface SimilarUser extends UserProfile {
  similarity_score: number;
  user_id: string;
}

interface UserProfileFormProps {
  onSimilarUsers: (users: SimilarUser[]) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSimilarUsers }) => {
  const [profile, setProfile] = useState<UserProfile>({
    Age: 25,
    Gender: '',
    Location: '',
    Income: 50000,
    Interests: '',
    Total_Spending: 1000,
    Product_Category_Preference: '',
    Time_Spent_on_Site_Minutes: 30
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const categoryOptions = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors',
    'Beauty & Personal Care', 'Books', 'Toys & Games', 'Food & Beverages'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call FastAPI backend
      const apiResponse: RecommendResponseItem[] = await fetchRecommendations(profile);
      // Map API response to SimilarUser type
      const similarUsers: SimilarUser[] = apiResponse.map((user) => ({
        Age: user.Age,
        Gender: user.Gender,
        Location: user.Location,
        Income: profile.Income, // Not returned by API, fallback to input
        Interests: user.Interests,
        Total_Spending: profile.Total_Spending, // Not returned by API, fallback to input
        Product_Category_Preference: profile.Product_Category_Preference, // Not returned by API, fallback to input
        Time_Spent_on_Site_Minutes: profile.Time_Spent_on_Site_Minutes, // Not returned by API, fallback to input
        similarity_score: (user["Similarity (%)"] || 0) / 100,
        user_id: user.User_ID,
      }));
      onSimilarUsers(similarUsers);
    } catch (err) {
      setError('Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'Age' || name === 'Income' || name === 'Total_Spending' || name === 'Time_Spent_on_Site_Minutes'
        ? parseInt(value) || 0
        : value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <User className="h-6 w-6 mr-3" />
          Find Similar Users
        </h2>
        <p className="text-blue-100 mt-2">
          Enter your profile information to discover users with similar preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="Age"
              value={profile.Age}
              onChange={handleInputChange}
              min="13"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="Gender"
              value={profile.Gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            >
              <option value="">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Location
            </label>
            <input
              type="text"
              name="Location"
              value={profile.Location}
              onChange={handleInputChange}
              placeholder="e.g., New York, NY"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Annual Income ($)
            </label>
            <input
              type="number"
              name="Income"
              value={profile.Income}
              onChange={handleInputChange}
              min="0"
              step="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              Interests
            </label>
            <input
              type="text"
              name="Interests"
              value={profile.Interests}
              onChange={handleInputChange}
              placeholder="e.g., Technology, Sports, Music"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Total Spending ($)
            </label>
            <input
              type="number"
              name="Total_Spending"
              value={profile.Total_Spending}
              onChange={handleInputChange}
              min="0"
              step="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Product Category Preference
            </label>
            <select
              name="Product_Category_Preference"
              value={profile.Product_Category_Preference}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            >
              <option value="">Select Category</option>
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Time Spent on Site (minutes)
            </label>
            <input
              type="number"
              name="Time_Spent_on_Site_Minutes"
              value={profile.Time_Spent_on_Site_Minutes}
              onChange={handleInputChange}
              min="0"
              max="1440"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Finding Similar Users...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Find Similar Users
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;