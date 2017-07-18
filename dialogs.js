const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = {
	showMessage,
	showSaveDialog,
	showOpenDialog 
};

function showMessage(browserWindow) {
	dialog.showMessageBox(browserWindow, {
		type: 'info',
		icon: nativeImage.createFromPath('./DPL-henry.jpg'),
		message: 'Hello',
		detail: 'Hello! my name is Henry and I made this app!',
		buttons: ['Greetings', 'Close'],
		defaultId: 0
	}, (clickedIndex) => {
		console.log(clickedIndex)
	})
}

function showSaveDialog(browserWindow) {
	dialog.showSaveDialog(browserWindow, {
		defaultPath: path.join(app.getPath('desktop'), 'memory-info.txt')
	}, (filename) => {
		if(filename) {
			const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
			fs.writeFile(filename, memInfo, 'utf8', (err) => {
				if(err) {
					dialog.showErrorBox('Save Failed', err.message);
				}
			});
		}
	})
}

function showOpenDialog(browserWindow) {
	dialog.showOpenDialog(browserWindow, {
		defaultPath: app.getPath('desktop'),
		filters: [
			{ name: 'Text Files', extensions:['txt'] }
		]
	}, (filepaths) => {
		if(filepaths) {
			console.log(filepaths, fs.readFileSync(filepaths[0], 'utf8'));
		}
	})
}