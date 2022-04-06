import { Conatainer, InputSearchContainer } from './styles';

import logo from '../../assets/images/logo.svg';

export function Header() {
  return (
    <Conatainer>
      <img src={logo} alt="Logo MyContacts" width="201px" />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>
    </Conatainer>
  );
}
