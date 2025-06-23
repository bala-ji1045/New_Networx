import React, { useState } from 'react';
import UserProfileForm from './UserProfileForm';
import SimilarUsersResults from './SimilarUsersResults';

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

const Dashboard: React.FC = () => {
  const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSimilarUsers = (users: SimilarUser[]) => {
    setSimilarUsers(users);
    setShowResults(true);
  };

  const handleReset = () => {
    setSimilarUsers([]);
    setShowResults(false);
  };

  return (
    <div className="space-y-8">
      {!showResults ? (
        <UserProfileForm onSimilarUsers={handleSimilarUsers} />
      ) : (
        <SimilarUsersResults users={similarUsers} onReset={handleReset} />
      )}
    </div>
  );
};

export default Dashboard;