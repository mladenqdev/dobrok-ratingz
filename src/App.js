import { useState } from "react";
import MealsList from "./components/MealsList";
import Header from "./components/Header";
import MealsContextProvider from "./contexts/MealsContext";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import PersonalMealsList from "./components/PersonalMealsList";

const App = () => {

	const [darkMode, setDarkMode] = useState(false);

	return (
		<MealsContextProvider>
			<div className={`theme ${darkMode && 'dark-mode'}`}>
				<div className="container">
				<Header handleToggleDarkMode={setDarkMode} />
					<Router>
						<AuthProvider>
							<Switch>
								<PrivateRoute exact path="/" component={MealsList} />
								<PrivateRoute path="/mylist" component={PersonalMealsList} />
								<Route path="/signup" component={Signup} />
								<Route path="/login" component={Login} />
								<Route path='/forgot-password' component={ForgotPassword} />
							</Switch>
						</AuthProvider>
					</Router>
				</div>
			</div>
		</MealsContextProvider>

	 );
}

export default App;
