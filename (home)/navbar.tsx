import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton,OrganizationSwitcher } from "@clerk/nextjs";
export const Navbar = ()=>{
return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
        <Image src="/WS1.svg" alt="logo" width={42} height={42}/>
        </Link>
      <h3 className="text-2xl font-semibold "  style={{color:"#4B0082", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>DocSync</h3>
      </div>
      <SearchInput/>  
      <div className="flex gap-3 items-center pl-6">
      <OrganizationSwitcher
      afterCreateOrganizationUrl="/"
      afterLeaveOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
      afterSelectPersonalUrl="/"
      />
      <UserButton/>
      </div>
      <div/>
    </nav>
);

};