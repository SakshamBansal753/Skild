import SkillCard from '#/components/SkillCard'
import { dummySkills } from '#/lib/dummy-skills'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Terminal } from 'lucide-react'

export  const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
   <div id="home"  >
     
     <section className="hero">
      <div className='copy'>
        <h1>
          The registry for <br/>
          <span className='text-gradient'>Agentic Intelligence</span>
        </h1>
        <p>
          A high-performance registry for procedural agent skill develop, publish, and operate reusable agent capabilities from a route drive and workspace centric perspective.
        </p>
      </div>
      <div className='actions'>
        <Link to="/skills" className='btn-primary'>
        <Terminal size={18}/>
        <span>Browse Registry</span>
        </Link>
         <Link to="/skills/new" className='btn-secondary'>
          Publish Skill
        </Link>

      </div>
      </section>
      <section className='latest'>
        <div className='space-y-2'>
          <h2>
            Recently Created <span className='text-gradient'>Skills</span>
          </h2>
          <p>
            {" "}
            Explore the latest skill added to the skill registry, showcasing a diverse range. 
          </p>
        </div>
        <div>
          {dummySkills.length>0?(
            <div className='skills-grid'>
              {dummySkills.map((skill)=>(
                <SkillCard key={skill.id} {...skill}/>
              ))}
              </div>
          ):(
            <p>No skills available.</p>
          )}
        </div>
      </section>
   </div>
  )
}
