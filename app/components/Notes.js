import React from 'react';
import Editable from './Editable.js';
import Note from './Note.js';

export default ({notes, onValueClick, onEdit, onDelete}) => {
	return (
		<ul className="notes">{notes.map(note =>
			<Note className="note" id={note.id} key={note.id}>
				<Editable
					editing={note.editing}
					value={note.task}
					onValueClick={onValueClick.bind(null, note.id)}
					onEdit={onEdit.bind(null, note.id)}
					onDelete={onDelete.bind(null, note.id)} />
			</Note>
		)}</ul>
	);
}