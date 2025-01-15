const Header = () => {
    return (
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget Tracker</h1>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 px-4 py-2 rounded">Settings</button>
          <div className="bg-blue-400 w-8 h-8 rounded-full"></div>
        </div>
      </header>
    );
  };
  
  export default Header;