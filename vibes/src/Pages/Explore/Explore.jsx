import React from 'react';
import { CategoryChips, MainComponent, ExploreMapping, CreatePlaylist } from '../../Components';

const Explore = () => {
  return (
    <div>
        <CategoryChips />
        <ExploreMapping />
        <CreatePlaylist onPlaylist={false}/>
    </div>
  )
}

export { Explore };