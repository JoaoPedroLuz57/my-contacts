import { Switch, Route } from 'react-router-dom';

import { Home } from './Pages/Home';
import { NewContact } from './Pages/NewContact';
import { EditContact } from './Pages/NewContact copy';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
