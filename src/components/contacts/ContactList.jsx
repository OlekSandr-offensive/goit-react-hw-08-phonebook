import './ContactList.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useDeleteContactsMutation,
  fetchAllContacts,
} from '../../redux/contacts/contacts-slice';
import { getFilters } from '../../redux/contacts/filters-selectors';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';

const ContactList = () => {
  const [deleteContacts] = useDeleteContactsMutation();
  const dispatch = useDispatch();
  const {
    contacts: { contacts },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const filters = useSelector(getFilters).toLowerCase();

  const getFilteredContacts = contacts =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filters));
  const filtered = contacts ? getFilteredContacts(contacts) : [];
  return (
    <>
      {filtered && (
        <ul className="ContactList">
          {filtered.map(({ id, name, number }) => (
            <li key={id}>
              <p>
                {name}:<span>{number}</span>
              </p>
              <button type="button" onClick={() => deleteContacts(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
