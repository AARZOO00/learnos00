'use client'

import { motion } from 'framer-motion'
import { Calendar, Flame, TrendingUp, Clock, Activity, CheckCircle } from 'lucide-react'

type Intensity = 0|1|2|3
const GRID: {day:number;intensity:Intensity}[] = [
  {day:0,intensity:0},{day:1,intensity:1},{day:2,intensity:3},{day:3,intensity:2},
  {day:4,intensity:1},{day:5,intensity:0},{day:6,intensity:0},{day:7,intensity:2},
  {day:8,intensity:3},{day:9,intensity:1},{day:10,intensity:2},{day:11,intensity:3},
  {day:12,intensity:1},{day:13,intensity:0},{day:14,intensity:1},{day:15,intensity:2},
  {day:16,intensity:0},{day:17,intensity:3},{day:18,intensity:2},{day:19,intensity:1},
  {day:20,intensity:0},{day:21,intensity:2},{day:22,intensity:3},{day:23,intensity:3},
  {day:24,intensity:1},{day:25,intensity:2},{day:26,intensity:0},{day:27,intensity:1},
]
const cellColor: Record<Intensity,{bg:string;shadow:string}> = {
  0:{bg:'rgba(26,37,64,0.5)',shadow:'none'},
  1:{bg:'#0e4a5e',shadow:'none'},
  2:{bg:'#0891b2',shadow:'0 0 6px rgba(0,217,255,0.2)'},
  3:{bg:'#00d9ff',shadow:'0 0 10px rgba(0,217,255,0.45)'},
}
const barH = [40,65,30,90,80,55,70]
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const stats = [
  {icon:Calendar,   label:'Total Sessions',  value:'21',     color:'#00d9ff', bg:'rgba(0,217,255,0.08)' },
  {icon:Clock,      label:'Hours Studied',   value:'47h',    color:'#7c3aed', bg:'rgba(124,58,237,0.08)'},
  {icon:Flame,      label:'Current Streak',  value:'5 days', color:'#f59e0b', bg:'rgba(245,158,11,0.08)'},
  {icon:TrendingUp, label:'Longest Streak',  value:'12 days',color:'#10b981', bg:'rgba(16,185,129,0.08)'},
]
const recentActivity = [
  {icon: CheckCircle, text:'Completed React Hooks module',          time:'2 hours ago',  color:'#10b981'},
  {icon: Activity,    text:'Started System Design chapter 3',       time:'Yesterday',    color:'#00d9ff'},
  {icon: CheckCircle, text:'Finished TypeScript generics quiz',     time:'2 days ago',   color:'#10b981'},
  {icon: Activity,    text:'Watched Node.js authentication video',  time:'3 days ago',   color:'#7c3aed'},
  {icon: Activity,    text:'Reviewed Advanced React patterns',      time:'4 days ago',   color:'#3d4f6b'},
]

const contV = { hidden:{}, visible:{transition:{staggerChildren:0.08, delayChildren:0.1}} }
const itemV = { hidden:{opacity:0,y:18}, visible:{opacity:1,y:0,transition:{type:'spring',stiffness:300,damping:28}} }

export default function ActivityPage() {
  const maxBar = Math.max(...barH)
  return (
    <main className="min-h-screen px-4 py-8 md:px-6 lg:px-8" style={{ background:'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <p style={{ fontFamily:'JetBrains Mono', fontSize:'11px', color:'#3d4f6b', marginBottom:'12px' }}>
          &gt; dashboard / <span style={{ color:'#00d9ff' }}>activity</span>
        </p>
        <h1 style={{ fontFamily:'Space Grotesk', fontWeight:700, fontSize:'clamp(22px,4vw,30px)', color:'#e8f0fe', marginBottom:'28px', letterSpacing:'-0.02em' }}>
          Activity Matrix
        </h1>

        {/* Stats */}
        <motion.div variants={contV} initial="hidden" animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map(s => (
            <motion.div key={s.label} variants={itemV}
              whileHover={{ scale:1.03, y:-2, transition:{type:'spring',stiffness:400,damping:20} }}
              className="rounded-2xl p-4 flex flex-col gap-2 noise-overlay"
              style={{ background:'var(--bg-card)', border:`1px solid ${s.bg.replace('0.08','0.18')}` }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background:s.bg, border:`1px solid ${s.color}25` }}>
                <s.icon size={15} style={{ color:s.color }} />
              </div>
              <div style={{ fontFamily:'JetBrains Mono', fontWeight:600, fontSize:'22px', color:'#e8f0fe', lineHeight:1 }}>
                {s.value}
              </div>
              <div style={{ fontSize:'11px', color:'#3d4f6b' }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Graph */}
        <motion.div variants={itemV} initial="hidden" animate="visible"
          className="rounded-2xl p-5 mb-5 noise-overlay"
          style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width:'8px',height:'8px',borderRadius:'50%',background:'#00d9ff',boxShadow:'0 0 6px rgba(0,217,255,0.5)' }} />
            <h2 style={{ fontFamily:'Space Grotesk', fontWeight:600, fontSize:'14px', color:'#e8f0fe' }}>28-Day Contribution Graph</h2>
          </div>
          <div className="grid mb-2" style={{ gridTemplateColumns:'repeat(7,minmax(0,1fr))',gap:'5px' }}>
            {['M','T','W','T','F','S','S'].map((d,i)=>(
              <div key={i} style={{ fontFamily:'JetBrains Mono',fontSize:'9px',color:'#3d4f6b',textAlign:'center' }}>{d}</div>
            ))}
          </div>
          <div className="grid" style={{ gridTemplateColumns:'repeat(7,minmax(0,1fr))',gap:'5px' }}>
            {GRID.map((cell,i)=>{
              const cfg = cellColor[cell.intensity]
              return (
                <motion.div key={i}
                  initial={{ opacity:0, scale:0.4 }}
                  animate={{ opacity:1, scale:1 }}
                  transition={{ type:'spring', stiffness:350, damping:22, delay:0.02*i }}
                  whileHover={{ scale:1.3, zIndex:10 }}
                  className="rounded-md aspect-square"
                  style={{ background:cfg.bg, boxShadow:cfg.shadow }}
                />
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span style={{ fontFamily:'JetBrains Mono', fontSize:'10px', color:'#3d4f6b' }}>
              {GRID.filter(d=>d.intensity>0).length} active days
            </span>
            <div className="flex items-center gap-1.5">
              {([0,1,2,3] as Intensity[]).map(lvl=>(
                <div key={lvl} style={{ width:'10px',height:'10px',borderRadius:'3px',background:cellColor[lvl].bg }} />
              ))}
              <span style={{ fontFamily:'JetBrains Mono',fontSize:'9px',color:'#3d4f6b',marginLeft:'4px' }}>Less → More</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Bar chart */}
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,type:'spring',stiffness:300,damping:28}}
            className="rounded-2xl p-5 noise-overlay"
            style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
            <h2 style={{ fontFamily:'Space Grotesk', fontWeight:600, fontSize:'14px', color:'#e8f0fe', marginBottom:'16px' }}>
              Weekly Study Hours
            </h2>
            <div className="flex items-end gap-2" style={{ height:'100px' }}>
              {barH.map((h,i)=>{
                const isMax = h === maxBar
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex items-end justify-center" style={{ height:'80px' }}>
                      <motion.div
                        initial={{ height:0 }}
                        animate={{ height:`${h}%` }}
                        transition={{ type:'spring', stiffness:280, damping:22, delay:0.4+i*0.07 }}
                        className="w-full rounded-t"
                        style={{
                          background: isMax ? 'linear-gradient(180deg,#00d9ff,#0891b2)' : 'linear-gradient(180deg,#1a2540,#1a2540)',
                          boxShadow: isMax ? '0 0 12px rgba(0,217,255,0.3)' : 'none',
                          minHeight:'3px', maxHeight:'100%',
                        }}
                      />
                    </div>
                    <span style={{ fontFamily:'JetBrains Mono', fontSize:'9px', color: isMax ? '#00d9ff' : '#3d4f6b' }}>
                      {days[i].slice(0,1)}
                    </span>
                  </div>
                )
              })}
            </div>
            <p style={{ fontFamily:'JetBrains Mono', fontSize:'10px', color:'#3d4f6b', marginTop:'10px' }}>
              Peak: <span style={{ color:'#00d9ff' }}>Thursday · 4.5h</span>
            </p>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.4,type:'spring',stiffness:300,damping:28}}
            className="rounded-2xl p-5 noise-overlay"
            style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}>
            <h2 style={{ fontFamily:'Space Grotesk', fontWeight:600, fontSize:'14px', color:'#e8f0fe', marginBottom:'14px' }}>
              Recent Activity
            </h2>
            <ul className="space-y-2">
              {recentActivity.map((a,i)=>(
                <motion.li key={i}
                  initial={{ opacity:0, x:-10 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.5+i*0.07, type:'spring', stiffness:300, damping:26 }}
                  className="flex items-start gap-3 py-2.5 px-3 rounded-xl"
                  style={{ background:'rgba(0,0,0,0.2)', border:'1px solid #1a2540' }}
                >
                  <div style={{ width:'2px', height:'100%', minHeight:'32px', borderRadius:'99px', background:a.color, flexShrink:0, marginTop:'2px' }} />
                  <a.icon size={13} style={{ color:a.color, flexShrink:0, marginTop:'2px' }} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize:'12px', color:'#8b9ab5', lineHeight:1.4 }}>{a.text}</p>
                    <p style={{ fontFamily:'JetBrains Mono', fontSize:'10px', color:'#3d4f6b', marginTop:'3px' }}>{a.time}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
