
export default function SideBar({children}: {children: React.ReactNode}) {
  return <div className='sidebar'>
    <div>
      this is a sidebar layout
    </div>
    
    {children}
    
    </div>
}