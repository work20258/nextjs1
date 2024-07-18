import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  SideNavMenu,
  SideNavMenuItem,
} from "@carbon/react";
import { Switcher, Notification, UserAvatar,Fade } from "@carbon/icons-react";

import Link from "next/link";

const TutorialHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Smart BD">
        <SkipToContent />
        <HeaderMenuButton aria-label="Open menu"
          onClick={onClickSideNavExpand} isActive={isSideNavExpanded}
        />
        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="IBM">Smart BD</HeaderName>
        </Link>
        
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
          href="#main-content"
        >
          <SideNavItems>
            <Link href="/rolepermission" passHref legacyBehavior>
                <SideNavMenuItem >RolePermission</SideNavMenuItem>
            </Link>
            <Link href="/test" passHref legacyBehavior>
                <SideNavMenuItem >test</SideNavMenuItem>
            </Link>
            <SideNavMenu title="Large menu 1">
                  <Link href="/repos" passHref legacyBehavior>
                    <SideNavMenuItem>repos</SideNavMenuItem>
                   </Link> 
                   <Link href="/repos1" passHref legacyBehavior>
                    <SideNavMenuItem>repos1</SideNavMenuItem>
                   </Link>   
                   <Link href="/repos2" passHref legacyBehavior>
                    <SideNavMenuItem>repos2</SideNavMenuItem>
                   </Link>  
              </SideNavMenu>
              <SideNavMenu title="Large menu 2">
                  <Link href="/repos3" passHref legacyBehavior>
                    <SideNavMenuItem>repos3</SideNavMenuItem>
                   </Link> 
                   <Link href="/repos4" passHref legacyBehavior>
                    <SideNavMenuItem>repos4</SideNavMenuItem>
                   </Link>   
                   <Link href="/repos5" passHref legacyBehavior>
                    <SideNavMenuItem>repos5</SideNavMenuItem>
                   </Link>  
                   <Link href="/repos6" passHref legacyBehavior>
                    <SideNavMenuItem>repos6</SideNavMenuItem>
                   </Link>   
                   <Link href="/repos7" passHref legacyBehavior>
                    <SideNavMenuItem>repos7</SideNavMenuItem>
                   </Link>  
              </SideNavMenu>
              <SideNavMenu title="SystemManagement">
                  <Link href="/rolemanagement" passHref legacyBehavior>
                    <SideNavMenuItem>RoleManagement</SideNavMenuItem>
                   </Link> 
              </SideNavMenu>              
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="center"
            className="action-icons"
          >
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="User Avatar"
            tooltipAlignment="center"
            className="action-icons"
          >
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )}
  />
);

export default TutorialHeader;