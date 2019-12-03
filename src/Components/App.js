import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import Dashboard from "./Dashboard";
import SimpleTable from './SimpleTable'
import { isReportArchived, archiveReport } from "../Utility/Report";
import { getReportsFromAPI } from "../API/CreditNovaAPI";


class App extends Component {
	state = {
		data: []
	};

	componentDidMount = async () => {
		console.log('doing this')
		const cursor = "2000-11-12T02:18:22.094Z";
		const count = 5;
		let data = await getReportsFromAPI(count, cursor);
		this.setState({ data });
		isReportArchived(this.state.data)
		let archivedReport = await archiveReport("f0549f22-ce07-11e7-8caa-db5e161d6850")
		this.setState({ thisOne: archivedReport })
		
	};


	render() {
		const { data, thisOne } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Nova's code challenge!</h1>
				</header>
				{thisOne ? (
					<p>
						This report has been archvied: {thisOne[0].firstName} {thisOne[0].lastName}
					</p>
				) : (
					<p>loading</p>
				)}
		{data.length>0 && <SimpleTable reports={data} />}
				
				{data && data.map(data => <Dashboard key={data.id} reports={data} />)}
				
			</div>
		);
	}
}

export default App;
