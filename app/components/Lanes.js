import React from 'react';
import Lane from './Lane.js';

export default ({lanes}) => {
	return (
		<div className="lanes">{lanes.map(lane =>
			<Lane className="lane" key={lane.id} lane={lane}>
				<Lane.Header name={lane.name} />
				<Lane.Notes notes={lane.notes} />
			</Lane>
			)}</div>
		);
}