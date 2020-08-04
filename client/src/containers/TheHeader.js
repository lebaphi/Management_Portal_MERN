import React from 'react'
import {
	CHeader,
	CHeaderBrand,
	CHeaderNav,
	CHeaderNavItem,
	CHeaderNavLink,
	CSubheader,
	CBreadcrumbRouter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { 
	TheHeaderDropdown,
	TheHeaderDropdownMssg,
	TheHeaderDropdownNotif,
	TheHeaderDropdownTasks
} from './index'

const TheHeader = () => {

	return (
		<CHeader withSubheader>
 
			<CHeaderBrand className="mx-auto d-lg-none" to="/">
				<CIcon name="logo" height="48" alt="Logo"/>
			</CHeaderBrand>

			<CHeaderNav className="d-md-down-none mr-auto">
				<CHeaderNavItem className="px-3" >
					<CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
				</CHeaderNavItem>
				<CHeaderNavItem className="px-3">
					<CHeaderNavLink to="/users">Users</CHeaderNavLink>
				</CHeaderNavItem>
			</CHeaderNav>

			<CHeaderNav className="px-3">
				<TheHeaderDropdownNotif/>
				<TheHeaderDropdownTasks/>
				<TheHeaderDropdownMssg/>
				<TheHeaderDropdown/>
			</CHeaderNav>

			<CSubheader className="px-3 justify-content-between">
				<CBreadcrumbRouter 
					className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
					routes={routes} 
				/>
			</CSubheader>
		</CHeader>
	)
}

export default TheHeader
