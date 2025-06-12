import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Edit, Trash2, 
  Settings, Moon, Sun, Users, TrendingUp, DollarSign, 
  ShoppingCart, Bell, Search, Menu, X, MoreVertical,
  Filter, Download, Eye, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [kanbanTasks, setKanbanTasks] = useState({
    todo: [
      { id: 1, title: 'Design Landing Page', priority: 'high', assignee: 'John' },
      { id: 2, title: 'Setup Database', priority: 'medium', assignee: 'Sarah' }
    ],
    inProgress: [
      { id: 3, title: 'Implement Auth', priority: 'high', assignee: 'Mike' },
      { id: 4, title: 'Create API Endpoints', priority: 'medium', assignee: 'Lisa' }
    ],
    done: [
      { id: 5, title: 'Project Setup', priority: 'low', assignee: 'John' },
      { id: 6, title: 'Requirements Analysis', priority: 'medium', assignee: 'Sarah' }
    ]
  });
  
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-06-07' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-06-06' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-06-05' },
    { id: 4, name: 'Lisa Chen', email: 'lisa@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-06-07' }
  ]);

  const chartData = [
    { name: 'Jan', sales: 4000, revenue: 2400, users: 240 },
    { name: 'Feb', sales: 3000, revenue: 1398, users: 221 },
    { name: 'Mar', sales: 2000, revenue: 9800, users: 229 },
    { name: 'Apr', sales: 2780, revenue: 3908, users: 200 },
    { name: 'May', sales: 1890, revenue: 4800, users: 218 },
    { name: 'Jun', sales: 2390, revenue: 3800, users: 250 }
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#8884d8' },
    { name: 'Mobile', value: 300, color: '#82ca9d' },
    { name: 'Tablet', value: 200, color: '#ffc658' },
    { name: 'Other', value: 100, color: '#ff7c7c' }
  ];

  const themeClasses = {
    light: {
      bg: 'bg-gray-50',
      cardBg: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      sidebar: 'bg-white border-gray-200',
      hover: 'hover:bg-gray-50'
    },
    dark: {
      bg: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      sidebar: 'bg-gray-800 border-gray-700',
      hover: 'hover:bg-gray-700'
    }
  };

  const currentTheme = themeClasses[theme];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className={`${currentTheme.cardBg} p-6 rounded-xl shadow-sm ${currentTheme.border} border transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${currentTheme.textSecondary} text-sm font-medium`}>{title}</p>
          <p className={`${currentTheme.text} text-2xl font-bold mt-2`}>{value}</p>
          <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([
      { date: '2024-06-07', title: 'Team Meeting', time: '10:00 AM' },
      { date: '2024-06-10', title: 'Project Review', time: '2:00 PM' },
      { date: '2024-06-15', title: 'Client Call', time: '3:30 PM' }
    ]);

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
      }
      return days;
    };

    const navigateMonth = (direction) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + direction);
      setCurrentDate(newDate);
    };

    const days = getDaysInMonth(currentDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <div className={`${currentTheme.cardBg} rounded-xl p-6 shadow-sm`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`${currentTheme.text} text-lg font-semibold`}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => navigateMonth(-1)}
              className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className={`p-2 text-center ${currentTheme.textSecondary} text-sm font-medium`}>
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`p-2 text-center cursor-pointer rounded-lg transition-colors ${
                day 
                  ? `${currentTheme.text} ${currentTheme.hover} hover:bg-blue-500 hover:text-white` 
                  : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className={`${currentTheme.text} font-semibold mb-3`}>Upcoming Events</h4>
          {events.map((event, index) => (
            <div key={index} className={`p-3 rounded-lg ${currentTheme.border} border mb-2`}>
              <div className={`${currentTheme.text} font-medium`}>{event.title}</div>
              <div className={`${currentTheme.textSecondary} text-sm`}>{event.date} at {event.time}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const KanbanBoard = () => {
    const [draggedTask, setDraggedTask] = useState(null);

    const handleDragStart = (e, task, column) => {
      setDraggedTask({ task, sourceColumn: column });
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetColumn) => {
      e.preventDefault();
      if (!draggedTask) return;

      const { task, sourceColumn } = draggedTask;
      if (sourceColumn === targetColumn) return;

      setKanbanTasks(prev => ({
        ...prev,
        [sourceColumn]: prev[sourceColumn].filter(t => t.id !== task.id),
        [targetColumn]: [...prev[targetColumn], task]
      }));

      setDraggedTask(null);
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high': return 'bg-red-500';
        case 'medium': return 'bg-yellow-500';
        case 'low': return 'bg-green-500';
        default: return 'bg-gray-500';
      }
    };

    const TaskCard = ({ task, column }) => (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, task, column)}
        className={`${currentTheme.cardBg} p-4 rounded-lg shadow-sm ${currentTheme.border} border cursor-move hover:shadow-md transition-all duration-200`}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className={`${currentTheme.text} font-medium`}>{task.title}</h4>
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
        </div>
        <div className={`${currentTheme.textSecondary} text-sm`}>
          Assigned to: {task.assignee}
        </div>
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(kanbanTasks).map(([column, tasks]) => (
          <div
            key={column}
            className={`${currentTheme.cardBg} rounded-xl p-6 shadow-sm`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`${currentTheme.text} font-semibold capitalize`}>
                {column.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <span className={`${currentTheme.textSecondary} text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full`}>
                {tasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} column={column} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const DataTable = () => {
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('all');

    const handleSort = (field) => {
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    };

    const filteredData = tableData.filter(row => 
      filterStatus === 'all' || row.status.toLowerCase() === filterStatus
    );

    const sortedData = [...filteredData].sort((a, b) => {
      if (!sortField) return 0;
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return (
      <div className={`${currentTheme.cardBg} rounded-xl shadow-sm overflow-hidden`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className={`${currentTheme.text} text-lg font-semibold`}>User Management</h3>
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg} ${currentTheme.text}`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="h-4 w-4 inline mr-2" />
                Add User
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${currentTheme.bg}`}>
              <tr>
                {['Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map(header => (
                  <th
                    key={header}
                    onClick={() => header !== 'Actions' && handleSort(header.toLowerCase().replace(' ', ''))}
                    className={`px-6 py-3 text-left ${currentTheme.textSecondary} font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map(row => (
                <tr key={row.id} className={`border-b ${currentTheme.border} ${currentTheme.hover} transition-colors`}>
                  <td className={`px-6 py-4 ${currentTheme.text}`}>{row.name}</td>
                  <td className={`px-6 py-4 ${currentTheme.textSecondary}`}>{row.email}</td>
                  <td className={`px-6 py-4 ${currentTheme.text}`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      row.role === 'Editor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {row.role}
                    </span>
                  </td>
                  <td className={`px-6 py-4`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${currentTheme.textSecondary}`}>{row.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Charts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${currentTheme.cardBg} p-6 rounded-xl shadow-sm`}>
          <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${currentTheme.cardBg} p-6 rounded-xl shadow-sm`}>
          <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${currentTheme.cardBg} p-6 rounded-xl shadow-sm`}>
        <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Sales Overview</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                color: theme === 'dark' ? '#ffffff' : '#000000'
              }} 
            />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="users" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value="12,489"
                change={12}
                icon={Users}
                color="bg-blue-500"
              />
              <StatCard
                title="Revenue"
                value="$24,780"
                change={8}
                icon={DollarSign}
                color="bg-green-500"
              />
              <StatCard
                title="Orders"
                value="1,847"
                change={-3}
                icon={ShoppingCart}
                color="bg-purple-500"
              />
              <StatCard
                title="Growth"
                value="18.2%"
                change={15}
                icon={TrendingUp}
                color="bg-orange-500"
              />
            </div>
            <Charts />
          </div>
        );
      case 'users':
        return <DataTable />;
      case 'calendar':
        return <Calendar />;
      case 'kanban':
        return <KanbanBoard />;
      default:
        return <div className={`${currentTheme.text}`}>Content for {activeTab}</div>;
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-200`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${currentTheme.sidebar} border-r transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6">
          <h1 className={`${currentTheme.text} text-xl font-bold`}>Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden ${currentTheme.text}`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'kanban', label: 'Kanban', icon: CheckCircle }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-500 text-white'
                  : `${currentTheme.text} ${currentTheme.hover}`
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-200`}>
        {/* Header */}
        <header className={`${currentTheme.cardBg} ${currentTheme.border} border-b px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`${currentTheme.text} lg:hidden mr-4`}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${currentTheme.textSecondary}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 ${currentTheme.cardBg} ${currentTheme.text} ${currentTheme.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <button className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text} relative`}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/32x32/8B5CF6/FFFFFF?text=JD"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;