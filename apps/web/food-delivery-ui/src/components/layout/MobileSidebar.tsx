import { ActionIcon, Text } from "@mantine/core"
import { IconX } from "@tabler/icons-react"
import Link from "next/link"


function MobileSidebar({mobileMenuOpen, setMobileMenuOpen, navLinks, pathname}:{
    mobileMenuOpen:boolean,
    setMobileMenuOpen:any,
    navLinks:any[]
    pathname:string
}) {
    
  return (
    <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl p-4 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <Text className="text-xl font-bold text-teal-600">منو</Text>
              <ActionIcon 
                variant="subtle" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <IconX size={20} />
              </ActionIcon>
            </div>
            
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    pathname === link.href
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
  )
}

export default MobileSidebar