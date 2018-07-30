import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import GenderForm from './GenderForm';
import ContactInfo from './ContactInfo';

class Intro extends Component{

		render(){
			return(
				<div>
					<BasicInfo/>
					<GenderForm/>
					<ContactInfo/>
				</div>
			)
		}
}

export default Intro;