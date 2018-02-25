import {schema, normalize} from 'normalizr';

const metadataEntity = new schema.Entity('metadata');

const aboutMeEntity = new schema.Entity('aboutme');

const profileEntity = new schema.Entity('profile', {
  metadata: metadataEntity,
  aboutMe: aboutMeEntity,
});

// Entities export
export const Entities = {
  PROFILE: profileEntity
};
