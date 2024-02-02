import React from 'react'
import Step from "./Step"
import { useSelector } from 'react-redux'

const Steps = () => {

  const page=useSelector((e)=>e.page.value)
  return (
    <div className='Steps'>
    <div className='Steps-content'>
      <Step step={1} title={"taskCompletion"} active={page==0}/>
      <Step step={2} title={"meetingDeadlines"} active={page==1}/>
      <Step step={3} title={"initiative"} active={page==2}/>
      <Step step={4} title={"collaboration"} active={page==3}/>
      <Step step={5} title={"adaptingToNewTasks"} active={page==4}/>
      <Step step={6} title={"conflictHandling"} active={page==5}/>
      <Step step={7} title={"mentorshipSupport"} active={page==6}/>
      <Step step={8} title={"ethicalBehavior"} active={page==7}/>
      <Step step={9} title={"customerInteractions"} active={page==8}/>
      <Step step={10} title={"feedbackHandling"} active={page==9}/>
      <Step step={11} title={"timingKeepup"} active={page==10}/>  
      <Step step={12} title={"communicationSkills"} active={page==11}/>
      <Step step={13} title={"attendancePercentage"} active={page==12}/>
      <Step step={14} title={"submit"} active={page==13}/>
      </div>
    </div>
  )
}

export default Steps;