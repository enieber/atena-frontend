import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Creators as AuthActions } from '../../../store/ducks/auth'

import Auth from '../../auth'
import avatarSvg from '../../../assets/avatarWhite.svg'
import StyledMenu, { Button } from './styles'

class Menu extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      activeModal: PropTypes.bool.isRequired,
      avatar: PropTypes.string,
      uuid: PropTypes.string,
      isCoreTeam: PropTypes.bool
    }).isRequired
  }

  toggleModal = () => {
    this.props.toggleModal()
  }

  logout = () => {
    this.props.signOut()
  }

  render() {
    const { uuid, isCoreTeam, activeModal, avatar } = this.props.auth
    return (
      <>
        <StyledMenu>
          <li key="index">
            <Link to="/">
              <Button>como funciona</Button>
            </Link>
          </li>
          <li key="ranking">
            <Link to="/ranking">
              <Button>ranking</Button>
            </Link>
          </li>
          {uuid ? (
            <>
              {isCoreTeam && (
                <li key="admin">
                  <Link to="/admin">
                    <Button>Admin</Button>
                  </Link>
                </li>
              )}

              <li key="logout">
                <Button danger onClick={this.logout}>logout</Button>
              </li>
              <li className="user">
                <Link to="/userInfo">
                  <Button className="profile">
                    <img
                      src={avatar || avatarSvg}
                      onError={e => {
                        e.target.onerror = null
                        e.target.src = avatarSvg
                      }}
                      alt={`Foto do usuário`}
                      className="avatar"
                    />
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <li key="login">
              <Button primary onClick={this.toggleModal}>login</Button>
            </li>
          )}
        </StyledMenu>
        {activeModal && <Auth />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
