import React from 'react'
import {
	CDropdown,
	CDropdownItem,
	CDropdownMenu,
	CDropdownToggle,
	CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

function signOut(props){
	localStorage.removeItem('token')
	props.history.push('login')
}

const TheHeaderDropdown = (props) => {

	return (
		<CDropdown
			inNav
			className="c-header-nav-items mx-2"
			direction="down"
		>
			<CDropdownToggle className="c-header-nav-link" caret={false}>
				<div className="c-avatar">
					<CImg
						src={'avatars/6.jpg'}
						className="c-avatar-img"
						alt="admin@bootstrapmaster.com"
					/>
				</div>
			</CDropdownToggle>
			<CDropdownMenu className="pt-0" placement="bottom-end">
				<CDropdownItem
					header
					tag="div"
					color="light"
					className="text-center"
				>
					<strong>Account</strong>
				</CDropdownItem>
				<CDropdownItem>
					<CIcon name="cil-user" className="mfe-2" />Profile
				</CDropdownItem>
				<CDropdownItem onClick={() => signOut(props)}>
					<CIcon name="cil-lock-locked" className="mfe-2" /> 
          SignOut
				</CDropdownItem>
			</CDropdownMenu>
		</CDropdown>
	)
}

export default TheHeaderDropdown
