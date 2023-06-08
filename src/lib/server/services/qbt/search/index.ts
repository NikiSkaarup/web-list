import deletePlugin from './delete';
import enablePlugin from './enable-plugin';
import installPlugin from './install-plugin';
import plugins from './plugins';
import results from './results';
import start from './start';
import status from './status';
import stop from './stop';
import uninstallPlugin from './uninstall-plugin';
import updatePlugins from './update-plugins';

export default {
	delete: deletePlugin,
	enablePlugin,
	installPlugin,
	plugins,
	results,
	start,
	status: status.single,
	statusAll: status.all,
	stop,
	uninstallPlugin,
	updatePlugins
};
