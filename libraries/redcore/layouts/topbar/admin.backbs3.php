<?php
/**
 * @package     Redcore
 * @subpackage  Layouts
 *
 * @copyright   Copyright (C) 2008 - 2015 redCOMPONENT.com. All rights reserved.
 * @license     GNU General Public License version 2 or later, see LICENSE.
 */

defined('JPATH_REDCORE') or die;

$data = $displayData;

// Component title (html) for the toolbar.
$componentTitle = '';

if (isset($data['component_title']))
{
	$componentTitle = $data['component_title'];
}

// Do we have to display an inner layout ?
$displayTopbarInnerLayout = false;

if (isset($data['topbar_inner_layout_display']))
{
	$displayTopbarInnerLayout = (bool) $data['topbar_inner_layout_display'];
}

$topbarInnerLayout = '';

// The topbar inner layout name.
if ($displayTopbarInnerLayout)
{
	if (!isset($data['topbar_inner_layout']))
	{
		throw new InvalidArgumentException('No topbar inner layout specified in the component layout.');
	}

	$topbarInnerLayout = $data['topbar_inner_layout'];
}

$topbarInnerLayoutData = array();

if (isset($data['topbar_inner_layout_data']))
{
	$topbarInnerLayoutData = $data['topbar_inner_layout_data'];
}

$user = JFactory::getUser();
$userName = $user->name;
$userId = $user->id;

// Prepare the logout uri or the sign out button.
$input = JFactory::getApplication()->input;
$option = $input->getString('option');
$view = $input->getString('view', 'null');
$returnUri = 'index.php?option=' . $option;

// Prepare the component uri
if ($option == 'com_redcore' && $view == 'config')
{
	$componentUri = JRoute::_('index.php?option=' . $input->getString('component', $option));
}
else
{
	$componentUri = JRoute::_('index.php?option=' . $option);
}

if ($view)
{
	$returnUri .= '&view=' . $view;
}

$returnUri = base64_encode($returnUri);

// Joomla menu
$displayJoomlaMenu = false;
$displayBackToJoomla = true;
$displayComponentVersion = false;

if (isset($data['display_joomla_menu']))
{
	$displayJoomlaMenu = (bool) $data['display_joomla_menu'];
}

if (isset($data['display_back_to_joomla']))
{
	$displayBackToJoomla = (bool) $data['display_back_to_joomla'];
}

if ($displayJoomlaMenu)
{
	JLoader::import('joomla.application.module.helper');
	$modules = JModuleHelper::getModules('menu');
}

if (isset($data['display_component_version']))
{
	$displayComponentVersion = (bool) $data['display_component_version'];
	$xml = RComponentHelper::getComponentManifestFile($option);
	$componentName = JText::_($xml->name);
	$version = (string) $xml->version;
}

if (!empty($data['logoutReturnUri']))
{
	$logoutReturnUri = base64_encode($data['logoutReturnUri']);
}
else
{
	$logoutReturnUri = base64_encode('index.php');
}
?>
<script type="text/javascript">
	jQuery(document).ready(function () {
		setInterval(function () {
			updateDateTime();
		}, 1000);
	});

	function updateDateTime() {
		var date = new Date();
		jQuery('.datetime').text(date.toLocaleString());
	}
</script>


<nav class="navbar navbar-static-top" role="navigation">
	<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
		<span class="sr-only"><?php echo JText::_('LIB_REDCORE_TOGGLE_NAVIGATION'); ?></span>
	</a>

	<div class="navbar-custom-menu">
		<ul class="nav navbar-nav">
			<?php if (isset($data['display_component_version'])) : ?>
			<li>
				<span>
					<?php echo $componentName . ' v' . $version; ?>
				</span>
			</li>
		<?php endif; ?>
			<li>
				<a href="index.php?option=com_admin&amp;task=profile.edit&amp;id=<?php echo $userId; ?>" class="btn btn-danger">
					<?php echo $userName ?>
				</a>
			</li>
			<li>
				<a href="index.php?option=com_login&amp;task=logout&amp;<?php echo JSession::getFormToken(); ?>=1&amp;return=<?php echo $logoutReturnUri; ?>" 
				class="btn btn-danger">
					<?php echo JText::_('LIB_REDCORE_ACCOUNT_LOGOUT'); ?>
				</a>
			</li>
		</ul>
	</div>
</nav>
