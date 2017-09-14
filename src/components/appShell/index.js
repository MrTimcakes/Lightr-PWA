import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import style from './style';

export default class AppShell extends Component {

	closeDrawer(){
		this.drawer.MDComponent.open = false;
	}

	render() {
		return (
			<div className={ style.appShell }>
				<Toolbar fixed={true}>
					<Toolbar.Row>
						<Toolbar.Section align-start={true}>
							<Toolbar.Icon href="#" onClick={(e)=>{ e.preventDefault(); this.drawer.MDComponent.open = true; }}>
								menu
							</Toolbar.Icon>
							<Toolbar.Title>
								Lightr
							</Toolbar.Title>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<Drawer.TemporaryDrawer ref={drawer=>{this.drawer = drawer;}} >
	        <Drawer.TemporaryDrawerHeader className="mdc-theme--primary-bg">
	          Lightr
	        </Drawer.TemporaryDrawerHeader>
	        <Drawer.TemporaryDrawerContent>
	        <List>
	          <List.LinkItem href="/" onClick={(e) =>{ e.preventDefault(); route("/"); this.closeDrawer(); }}>
	            <List.ItemIcon>home</List.ItemIcon>
	            Home
	          </List.LinkItem>
						<hr class="mdc-list-divider" />
	          <List.LinkItem href="/settings" onClick={(e) =>{ e.preventDefault(); route("/settings"); this.closeDrawer(); }}>
	            <List.ItemIcon>settings</List.ItemIcon>
	            Settings
	          </List.LinkItem>
	        </List>
	        </Drawer.TemporaryDrawerContent>
	      </Drawer.TemporaryDrawer>
			</div>
		);
	}
}
