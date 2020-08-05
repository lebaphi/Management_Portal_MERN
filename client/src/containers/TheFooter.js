import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
	return (
		<CFooter fixed={false}>
			<div className="mfs-auto">
				<span className="mr-1">Powered by</span>
				<a href="javascript" target="_blank" rel="noopener noreferrer">Phile</a>
			</div>
		</CFooter>
	)
}

export default React.memo(TheFooter)
