document.addEventListener('DOMContentLoaded', () => {

  const newItemform = document.querySelector('#new-item-form');
  newItemform.addEventListener('submit', handleNewItemFormSubmit);

  const typeSelect = document.querySelector('#hadronic');
  typeSelect.addEventListener('change', handleParticleTypeSelect);

  const deleteAllButton = document.querySelector('#delete-all');
  deleteAllButton.addEventListener('click', handleDeleteAllClick);

})

const handleNewItemFormSubmit = function (event) {

  event.preventDefault();

  const particleListItem = createParticleListItem(event.target);
  const particleList = document.querySelector('#particle-list');
  particleList.appendChild(particleListItem);

  handleParticleTypeSelect(event); //Needed to ensure that the quark list is removed when the page resets
  event.target.reset();
}

const handleParticleTypeSelect = (event) => {

  const isIDThere = document.querySelector('#quarkList');
  if (isIDThere === null && event.target.value === "yes"){

    const quarkList = quarkListHTML();
    const addQuarks = document.querySelector('#form-wrapper');
    addQuarks.insertBefore(quarkList,addQuarks.childNodes[8]);

  } else if (isIDThere !== null && event.target.value !== "yes") {
    isIDThere.parentNode.removeChild(isIDThere);
  }

}

const createParticleListItem = function (form) {

  const particleListItem = document.createElement('li');
  particleListItem.classList.add('particle-list-item');

  const name = document.createElement('p');
  name.textContent = `Name:  ${form.name.value}`;
  particleListItem.appendChild(name);

  const mass = document.createElement('p');
  mass.textContent = `Mass:  ${form.mass.value}`;
  particleListItem.appendChild(mass);

  const type = document.createElement('p');
  type.textContent = `Type:  ${form.type.value}`;
  particleListItem.appendChild(type);

  const hadronic = document.createElement('p');
  hadronic.textContent = `Hadronic:  ${form.hadronic.value}`;
  particleListItem.appendChild(hadronic);

  const quarks = ['up', 'down', 'top', 'bottom', 'charm', 'strange', 'anti_up', 'anti_down', 'anti_top','anti_down','anti_charm','anti_strange']

  if (form.hadronic.value === "yes"){
    const QuarkSet = document.createElement('p');

    QuarkSet.textContent = "Quarks:"
    for (quark of quarks) {
      if (form[quark].checked) {
        QuarkSet.textContent = `${QuarkSet.textContent}, ${quark}`;
      }
    }
    particleListItem.appendChild(QuarkSet)
  }


  return particleListItem;
}

const quarkListHTML = () => {

    const divContainer = document.createElement('div');

    divContainer.classList.add('form-item-quarks');
    const div_code =
      `<fieldset class="particle-fieldset" id="quarkGroup">
          <p>Quark Composition</p>
          <label for="quark_up"><input type="checkbox" id="up" name="quark_up">Up</label>
          <label for="quark_down"><input type="checkbox" id="down" name="quark_down">Down</label>
          <label for="quark_top"><input type="checkbox" id="top" name="quark_top">Top</label>
          <label for="quark_bottom"><input type="checkbox" id="bottom" name="quark_bottom">Bottom</label>
          <label for="quark_charm"><input type="checkbox" id="charm" name="quark_charm">Charm</label>
          <label for="quark_strange"><input type="checkbox" id="strange" name="quark_strange">Strange</label>

          <label for="quark_antiup"><input type="checkbox" id="anti_up" name="quark_antiup">Anti Up</label>
          <label for="quark_antidown"><input type="checkbox" id="anti_down" name="quark_antidown">Anti Down</label>
          <label for="quark_antitop"><input type="checkbox" id="anti_top" name="quark_antitop">Anti Top</label>
          <label for="quark_antibottom"><input type="checkbox" id="anti_bottom" name="quark_antibottom">Anti Bottom</label>
          <label for="quark_anticharm"><input type="checkbox" id="anti_charm" name="quark_anticharm">Anti Charm</label>
          <label for="quark_antistrange"><input type="checkbox" id="anti_strange" name="quark_antistrange">Anti Strange</label>

        </fieldset>`;

    divContainer.innerHTML = div_code;
    divContainer.id = "quarkList"
    return divContainer;

}

// Delete functionality
const handleDeleteAllClick = function (event) {
  const particleList = document.querySelector('#particle-list');
  particleList.innerHTML = '';
}
