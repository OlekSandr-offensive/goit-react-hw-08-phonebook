import './ContactList.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchContactsQuery } from '../../redux/contacts/contacts-operation';
import { unsubscribe } from '../../redux/auth/auth-slice';
import ContactListItem from './ContactListItem';
import { Watch } from 'react-loader-spinner';
import { getFilters } from '../../redux/contacts/filters-selectors';
import authSelectors from '../../redux/auth/auth-selectors';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';

const ContactList = () => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUserName);
  const filters = useSelector(getFilters).toLowerCase().trim();

  const { data: contacts, isFetching, error } = useFetchContactsQuery(user);

  const getFilteredContacts = contacts =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filters));

  const filtered = contacts ? getFilteredContacts(contacts) : [];

  useEffect(() => {
    if (error?.status === 401) {
      dispatch(unsubscribe());
    }
  });

  return (
    <>
      {filtered && (
        <ul className="ContactList">
          {filtered.map(contact => (
            <ContactListItem key={contact._id} {...contact} />
          ))}
        </ul>
      )}
      {isFetching && (
        <Watch
          height="30"
          width="30"
          color="teal"
          ariaLabel="loading"
          wrapperStyle={{ top: '20' }}
        />
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
