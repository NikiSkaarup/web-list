import add from './add';
import addTags from './add-tags';
import addTrackers from './add-trackers';
import bottomPriority from './bottom-priority';
import categories from './categories';
import createCategory from './create-category';
import createTags from './create-tags';
import decreasePriority from './decrease-priority';
import deleteTags from './delete-tags';
import downloadLimit from './download-limit';
import editCategory from './edit-category';
import editTrackers from './edit-trackers';
import filePriority from './file-priority';
import files from './files';
import increasePriority from './increase-priority';
import info from './info';
import pause from './pause';
import pieceHashes from './piece-hashes';
import pieceStates from './piece-states';
import properties from './properties';
import reannounce from './reannounce';
import recheck from './recheck';
import removeCategories from './remove-categories';
import removeTags from './remove-tags';
import removeTrackers from './remove-trackers';
import renameFile from './rename-file';
import renameFolder from './rename-folder';
import setAutoManagement from './set-auto-management';
import setCategory from './set-category';
import setDownloadLimit from './set-download-limit';
import setForceStart from './set-force-start';
import setLocation from './set-location';
import setShareLimit from './set-share-limit';
import setSuperSeeding from './set-super-seeding';
import setTorrentName from './set-torrent-name';
import setUploadLimit from './set-upload-limit';
import tags from './tags';
import toggleFirstLastPiecePriority from './toggle-first-last-piece-priority';
import toggleSequentialDownload from './toggle-sequential-download';
import topPriority from './top-priority';
import torrentDelete from './delete';
import trackers from './trackers';
import uploadLimit from './upload-limit';
import webSeeds from './webSeeds';

export default {
	add,
	addTags: addTags.single,
	addTagsAll: addTags.all,
	addTrackers,
	bottomPriority: bottomPriority.single,
	bottomPriorityAll: bottomPriority.all,
	categories,
	createCategory,
	createTags,
	decreasePriority: decreasePriority.single,
	decreasePriorityAll: decreasePriority.all,
	delete: torrentDelete.single,
	deleteAll: torrentDelete.all,
	deleteTags,
	downloadLimit: downloadLimit.single,
	downloadLimitAll: downloadLimit.all,
	editCategory,
	editTrackers,
	filePriority,
	files,
	increasePriority: increasePriority.single,
	increasePriorityAll: increasePriority.all,
	info,
	pause: pause.single,
	pauseAll: pause.all,
	pieceHashes,
	pieceStates,
	properties,
	reannounce: reannounce.single,
	reannounceAll: reannounce.all,
	recheck: recheck.single,
	recheckAll: recheck.all,
	removeCategories,
	removeTags: removeTags.single,
	removeTagsAll: removeTags.all,
	removeTrackers,
	renameFile,
	renameFolder,
	setAutoManagement: setAutoManagement.single,
	setAutoManagementAll: setAutoManagement.all,
	setCategory: setCategory.single,
	setCategoryAll: setCategory.all,
	setDownloadLimit: setDownloadLimit.single,
	setDownloadLimitAll: setDownloadLimit.all,
	setForceStart: setForceStart.single,
	setForceStartAll: setForceStart.all,
	setLocation: setLocation.single,
	setLocationAll: setLocation.all,
	setShareLimit: setShareLimit.single,
	setShareLimitAll: setShareLimit.all,
	setSuperSeeding: setSuperSeeding.single,
	setSuperSeedingAll: setSuperSeeding.all,
	setTorrentName,
	setUploadLimit: setUploadLimit.single,
	setUploadLimitAll: setUploadLimit.all,
	tags,
	toggleFirstLastPiecePriority: toggleFirstLastPiecePriority.single,
	toggleFirstLastPiecePriorityAll: toggleFirstLastPiecePriority.all,
	toggleSequentialDownload: toggleSequentialDownload.single,
	toggleSequentialDownloadAll: toggleSequentialDownload.all,
	topPriority: topPriority.single,
	topPriorityAll: topPriority.all,
	trackers,
	uploadLimit: uploadLimit.single,
	uploadLimitAll: uploadLimit.all,
	webSeeds
};
