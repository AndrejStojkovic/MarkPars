import React, { useState } from 'react';
import parse from 'html-react-parser';

import './parser.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faMarkdown } from '@fortawesome/free-brands-svg-icons';
import { faFile, faUpload, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Parser = () => {
	const [state, setState] = useState({
		raw: 'Type here...',
		preview: 'Type here...',
		docTitle: 'Untitled Document',
		fileDownloadUrl: '',
		lines: 1,
		chars: 12
	});

	const markdownParser = (event: any) => {
		const htmlText = event.target.value
			.replace(/^### (.*$)/gim, '<h3>$1</h3>')
			.replace(/^## (.*$)/gim, '<h2>$1</h2>')
			.replace(/^# (.*$)/gim, '<h1>$1</h1>')
			.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
			.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
			.replace(/\*(.*)\*/gim, '<i>$1</i>')
			.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
			.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
			.replace(/\n$/gim, '<br />');

		console.log('markdown parsed');
		console.log(event.target.length);
		setState({...state, raw: event.target.value, preview: htmlText, chars: event.target.value.length, lines: event.target.value.split('\n').length});
	}

	const newDocument = () => {
		window.location.reload();
	}

	const uploadDocument = () => {
		// add upload function
	}

	const exportHTML = (event: any) => {
		const blob = new Blob([state.preview], {type: 'text/html'});
    const fileDownloadUrl = URL.createObjectURL(blob);

		console.log(fileDownloadUrl);
		window.open(fileDownloadUrl);

		setState({...state, fileDownloadUrl: fileDownloadUrl});
		URL.revokeObjectURL(fileDownloadUrl);
		setState({...state, fileDownloadUrl: ''});
	}

	const exportMD = (event: any) => {
		const blob = new Blob([state.raw], {type: 'text/markdown'});
    const fileDownloadUrl = URL.createObjectURL(blob);

		console.log(fileDownloadUrl);
		window.open(fileDownloadUrl);

		setState({...state, fileDownloadUrl: fileDownloadUrl});
		URL.revokeObjectURL(fileDownloadUrl);
		setState({...state, fileDownloadUrl: ''});
	}

	return (
		<div className='block'>
			<div className='section-two'>
				<div className='left'>
					<p>Document Name</p>
					<input type='text' id='doc-title' defaultValue={state.docTitle} />

					<div className='option-buttons'>
						<button title='Empty File' className='icon' onClick={newDocument}><FontAwesomeIcon icon={faFile} /></button>
						<button title='Info' className='icon'><FontAwesomeIcon icon={faQuestionCircle} /></button>
					</div>
				</div>

				<div className='right'>
					<p>Export as:</p>
					<button onClick={exportHTML} className='icon'><FontAwesomeIcon icon={faHtml5} /></button>
					<button onClick={exportMD} className='icon'><FontAwesomeIcon icon={faMarkdown} /></button> <br />
				</div>
			</div>

			<div className='parser'>
				<div className='code'>
					<div className='header'>
						<p className='title'>Markdown</p>

						<p className='stats'>
							Lines: <span className='lines'>{state.lines}</span><br/>
							Characters: <span className='chars'>{state.chars}</span>
						</p>
					</div>
				</div>

				<div className='preview'>
					<div className='header'>
						<p className='title'>Preview</p>
					</div>
				</div>
			</div>

			<div className='parser sec'>
				<div className='code'>
					<textarea onChange={markdownParser} defaultValue='Type here...' name='md-code' id='md-code'></textarea>
				</div>

				<div className='preview'>
					<div id='md-preview'>
						{parse(state.preview)}
					</div>
				</div>
			</div>
		</div>
	)
};

export default Parser;