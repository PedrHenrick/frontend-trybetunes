import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: {},
      music: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.musics(id);
  }

  musics = async (id) => {
    const album = await musicsAPI(id);
    const colection = album[0];
    const songs = album.filter((_song, index) => index !== 0);
    this.setState({
      album: colection,
      music: songs,
      loading: false,
    });
  }

  renderPage = () => {
    const { album, music } = this.state;
    return (
      <section>
        <h3 data-testid="artist-name">{ album.artistName }</h3>
        <h3 data-testid="album-name">{ album.collectionName }</h3>
        { music.map((song) => (
          <MusicCard
            nome={ song.trackName }
            value={ song.previewUrl }
            key={ song.trackId }
          />
        )) }
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.renderPage() }
        <Link to="/search">Voltar</Link>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};