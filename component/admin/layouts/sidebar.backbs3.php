<?php
/**
 * @package     Redcore.Admin
 * @subpackage  Layouts
 *
 * @copyright   Copyright (C) 2008 - 2015 redCOMPONENT.com. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('_JEXEC') or die;
$option = JFactory::getApplication()->input->getString('component', '');
$view = RInflector::pluralize(JFactory::getApplication()->input->getString('view', ''));
$return = JFactory::getApplication()->input->getString('return', '');
$contentElement = JFactory::getApplication()->input->getString('contentelement', '');
$components = RedcoreHelpersView::getExtensionsRedcore();
$translationTables = RTranslationHelper::getInstalledTranslationTables();

// Joomla menu
$displayBackToJoomla = true;

if (isset($data['display_back_to_joomla']))
{
	$displayBackToJoomla = (bool) $data['display_back_to_joomla'];
}

if (empty($return))
{
	$return = base64_encode('index.php?option=com_redcore&view=dashboard');
}
?>

<aside class="main-sidebar">
	<section class="sidebar">
		<ul class="sidebar-menu">
			<?php if ($displayBackToJoomla) : ?>
			<li>
				<a href="<?php echo JRoute::_('index.php') ?>">
					<i class="fa fa-reply"></i>
					<span>
						Back to Joomla
					</span>
				</a>
			</li>
			<?php endif; ?>
			<li class="header">redCORE</li>
			<li class="active">
				<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=dashboard') ?>">
					<i class="fa fa-dashboard"></i>
					<span>
						<?php echo JText::_('COM_REDCORE_DASHBOARD') ?>
					</span>
				</a>
			</li>
			<?php if (count($components)) : ?>
			<li class="treeview">
				<a href="#">
					<i class="fa fa-cog"></i>
					<span>
						<?php echo JText::_('COM_REDCORE_CONFIGURATION') ?></a>
					</span>
					<span class="label label-primary pull-right">
						<?php echo count($components) ?>
					</span>
				</a>
				<ul class="treeview-menu">
				<?php foreach ($components as $component) : ?>
					<li>
						<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=config&layout=edit&component=' . $component->option . '&return=' . $return) ?>">
							<i class="fa"></i>
							<?php echo JText::_($component->xml->name); ?>
						</a>
					</li>
				<?php endforeach; ?>
				</ul>
			</li>
			<?php endif; ?>
			<li class="treeview">
				<a href="#">
					<i class="fa fa-globe"></i>
					<span>
						<?php echo JText::_('COM_REDCORE_TRANSLATIONS') ?>
					</span>
					<span class="label label-primary pull-right">
						<?php echo count($translationTables) ?>
					</span>
				</a>
				<ul class="treeview-menu">
					<li>
						<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=translations&contentelement=&layout=manage&return=' . $return) ?>">
							<i class="fa fa-globe"></i>
							<?php echo JText::_('COM_REDCORE_TRANSLATIONS_MANAGE_CONTENT_ELEMENTS') ?>
						</a>
					</li>
					<?php
						if ($translationTables) :
							foreach ($translationTables as $translationTable) :
					?>
					<li>
						<a href="<?php echo JRoute::_(
							'index.php?option=com_redcore&view=translations&component=' . $translationTable->option . '&contentelement='
							. str_replace('#__', '', $translationTable->table)
							. '&return=' . $return
						); ?>">
							<i class="fa fa-globe"></i>
							<?php echo $translationTable->name; ?>
						</a>
					</li>
					<?php
							endforeach;
						endif;
					?>
				</ul>
			</li>
			<li class="treeview">
				<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=webservices') ?>">
					<i class="fa fa-globe"></i>
					<?php echo JText::_('COM_REDCORE_WEBSERVICES') ?>
				</a>
			</li>
			<li class="treeview">
				<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=oauth_clients') ?>">
					<i class="fa fa-globe"></i>
					<?php echo JText::_('COM_REDCORE_OAUTH_CLIENTS') ?>
				</a>
			</li>
			<li class="treeview">
				<a href="#">
					<i class="fa fa-globe"></i>
					<span>
						<?php echo JText::_('COM_REDCORE_PAYMENTS') ?>					
					</span>
					<i class="fa fa-angle-left pull-right"></i>
				</a>
				<ul class="treeview-menu">
					<li>
						<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=payment_dashboard') ?>">
							<i class="fa fa-dashboard"></i>
							<?php echo JText::_('COM_REDCORE_PAYMENT_DASHBOARD') ?>
						</a>
					</li>
					<li>
						<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=payment_configurations') ?>">
							<i class="fa fa-cogs"></i>
							<?php echo JText::_('COM_REDCORE_PAYMENT_CONFIGURATION_LIST_TITLE') ?>
						</a>
					</li>
					<li>
						<a href="<?php echo JRoute::_('index.php?option=com_redcore&view=payments') ?>">
							<i class="fa fa-money"></i>
							<?php echo JText::_('COM_REDCORE_PAYMENTS') ?>
						</a>
					</li>
				</ul>
			</li>
			<li class="treeview">
				<a href="http://redcomponent-com.github.io/redCORE/" target="_blank">
					<i class="fa fa-book"></i>
					<?php echo JText::_('COM_REDCORE_DOCUMENTATION_LINK_TITLE') ?>
				</a>
			</li>
		</ul>
	</section>
</aside>
