import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
  LoadingSpinner,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    morePages: false,
    loading: false,
  };

  componentDidMount() {
    this.loadStars();
  }

  loadStars = async () => {
    // console.tron.log('loadStars');

    try {
      const { stars, page } = this.state;
      // if (loading) return;
      this.setState({ loading: true });

      const { navigation } = this.props;
      const user = navigation.getParam('user');

      const response = await api.get(
        `/users/${user.login}/starred?page=${page}`,
      );

      // Verifica se tem mais páginas
      let morePages = false;
      if (
        response.headers.link &&
        response.headers.link.includes('rel="next"')
      ) {
        morePages = true;
      }

      return this.setState({
        stars: stars.concat(response.data),
        page: page + 1,
        morePages,
        loading: false,
      });
    } catch (error) {
      return error;
    }
  };

  handleLoadMore = () => {
    // console.tron.log('handleLoadMore');
    const { loading, morePages } = this.state;
    if (!loading && morePages) {
      this.loadStars();
    }
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) return null;
    return (
      <Loading>
        <LoadingSpinner />
      </Loading>
    );
  };

  refreshList = async () => {
    // console.tron.log('refreshList');

    await this.setState({
      stars: [],
      page: 1,
      morePages: false,
      loading: false,
    });

    this.loadStars();
  };

  handleNavigate = (repository) => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  render() {
    // console.tron.log(this.state);
    const { stars, loading } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    // Exibe o loading principal somente ao entrar na página
    if (loading && stars.length === 0) {
      return (
        <Loading>
          {/* <Modal transparent animationType="none" visible={loading} /> */}
          <LoadingSpinner />
        </Loading>
      );
    }

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={this.handleLoadMore} // Função que carrega mais itens
          // ListFooterComponent={this.renderFooter}
          onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={loading} // Variável que armazena um estado true/false que representa se a lista está atualizando
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                <Starred onTouch>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    );
  }
}
