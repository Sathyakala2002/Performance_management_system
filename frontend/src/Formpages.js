import Steps from "./components/Steps";
import TaskCompletion from "./components/taskCompletion";
import MeetingDeadlines from "./components/meeingdeadline"
import Initiative from "./components/Initiative"
import Collaboration from "./components/Collaboration";
import AdaptingNewTasks from "./components/AdaptingNewSills"
import ConflictHandling from "./components/ConflictHandiling"
import MentorshipSupport from "./components/MentorshipSupport"
import EthicalBehavior from "./components/Ethicalbehavior"
import ClientInteractions from "./components/ClientIntraction"
import FeedbackHandling from "./components/FeedbackHandling"
import TimingKeepup from "./components/LoginTiming"
import CommunicationSkills from "./components/Communication"
import Attendance from "./components/Attendance"
import NavigationButton from "./components/NavigationButtons"
import Submitpage from "./components/Submitpage"
import { useSelector } from "react-redux";
import { Bar } from "./layout/m";
function App() {
  
  const page=useSelector((e)=>e.page.value)
  
  const PageDisplay=()=>{
    switch(page){
      case 0:
        return <TaskCompletion/>
      case 1:
        return <MeetingDeadlines/>
      case 2:
        return <Initiative/>
      case 3:
        return <Collaboration/> 
      case 4:
        return <AdaptingNewTasks/>
      case 5:
        return <ConflictHandling/>
      case 6:
        return <MentorshipSupport/>
      case 7:
        return <EthicalBehavior/>
      case 8:
        return <ClientInteractions/>
      case 9:
        return <FeedbackHandling/>
      case 10:
        return <TimingKeepup/>
      case 11:
        return <CommunicationSkills/>
      case 12:
        return <Attendance/>
      case 13:
        return <Submitpage/>
    }
  }
  return (
    <div>
        <Bar/>
    <main>
      <div className="Container">
        <Steps/>
        <div className="content">
        {PageDisplay()}
        {page != 14 && <NavigationButton/>} 
        </div>
      </div>
      
    </main>
    </div>
  );
}

export default App;