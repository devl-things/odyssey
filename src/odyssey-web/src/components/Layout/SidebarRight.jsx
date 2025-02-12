import PropTypes from 'prop-types';

const SidebarRight = ({ isVisible, children }) => {

    return (
        <nav id="sidebar-right" className={`sidebar ${isVisible ? '' : 'collapsed'}`} >
            <div className="sidebar-content">
                {children}
            </div>
        </nav>
    );
};

SidebarRight.propTypes =
{
    isVisible: PropTypes.bool.isRequired,
    children: PropTypes.node
}

export default SidebarRight;
