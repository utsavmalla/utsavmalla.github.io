export interface Skill {
  name: string
  proficiency: number
}

export const skills: Skill[] = [
  { name: 'JavaScript', proficiency: 80 },
  { name: 'AngularJs', proficiency: 70 },
  { name: '.NET MVC', proficiency: 60 },
  { name: 'Microsoft SQL Server', proficiency: 60 },
  { name: 'React', proficiency: 20 },
  { name: 'Node.js', proficiency: 30 },
  { name: 'GitHub', proficiency: 50 },
]

export default skills

