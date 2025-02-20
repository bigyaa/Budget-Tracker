const SummaryWidget = () => {
    return (
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Income</p>
            <p className="text-green-500 font-bold">$5,000</p>
          </div>
          <div>
            <p className="text-gray-600">Expenses</p>
            <p className="text-red-500 font-bold">$3,200</p>
          </div>
          <div>
            <p className="text-gray-600">Balance</p>
            <p className="text-blue-500 font-bold">$1,800</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SummaryWidget;