import React from 'react';
import { User, MapPin, DollarSign, Heart, ShoppingCart, Clock, Star, TrendingUp } from 'lucide-react';

interface SimilarUser {
  Age: number;
  Gender: string;
  Location: string;
  Income: number;
  Interests: string;
  Total_Spending: number;
  Product_Category_Preference: string;
  Time_Spent_on_Site_Minutes: number;
  similarity_score: number;
  user_id: string;
}

interface SimilarUsersResultsProps {
  users: SimilarUser[];
  onReset: () => void;
}

const SimilarUsersResults: React.FC<SimilarUsersResultsProps> = ({ users, onReset }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 bg-green-100';
    if (score >= 0.8) return 'text-blue-600 bg-blue-100';
    if (score >= 0.7) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.9) return 'Excellent Match';
    if (score >= 0.8) return 'Good Match';
    if (score >= 0.7) return 'Fair Match';
    return 'Low Match';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <TrendingUp className="h-6 w-6 mr-3" />
                Similar Users Found
              </h2>
              <p className="text-green-100 mt-2">
                Discovered {users.length} users with similar profiles
              </p>
            </div>
            <button
              onClick={onReset}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              New Search
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users.map((user, index) => (
          <div
            key={user.user_id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      User #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-500">{user.user_id}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(user.similarity_score)}`}>
                    <Star className="h-4 w-4 mr-1" />
                    {(user.similarity_score * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getScoreLabel(user.similarity_score)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Age:</span>
                    <span className="ml-auto font-medium">{user.Age}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Gender:</span>
                    <span className="ml-auto font-medium">{user.Gender}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-auto font-medium text-right">{user.Location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Income:</span>
                    <span className="ml-auto font-medium">${user.Income.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Spending:</span>
                    <span className="ml-auto font-medium">${user.Total_Spending.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <ShoppingCart className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-auto font-medium text-right">{user.Product_Category_Preference}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Time:</span>
                    <span className="ml-auto font-medium">{user.Time_Spent_on_Site_Minutes}m</span>
                  </div>
                  
                  <div className="flex items-start text-sm">
                    <Heart className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <span className="text-gray-600">Interests:</span>
                    <span className="ml-auto font-medium text-right max-w-24 truncate" title={user.Interests}>
                      {user.Interests}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`px-6 py-3 border-t ${getScoreColor(user.similarity_score).replace('text-', 'bg-').replace('bg-', 'bg-').replace('-600', '-50').replace('-100', '-100')} border-opacity-50`}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Similarity Score</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className={`h-2 rounded-full ${getScoreColor(user.similarity_score).includes('green') ? 'bg-green-500' : getScoreColor(user.similarity_score).includes('blue') ? 'bg-blue-500' : getScoreColor(user.similarity_score).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${user.similarity_score * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold">{(user.similarity_score * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarUsersResults;