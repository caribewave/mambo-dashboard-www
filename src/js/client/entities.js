import {schema, normalize} from 'normalizr';

const metadataEntity = new schema.Entity('metadata');

const aboutMeEntity = new schema.Entity('aboutme');

const workEntity = new schema.Entity('work');

const educationEntity = new schema.Entity('education');

const skillEntity = new schema.Entity('skill')

const skillsetEntity = new schema.Entity('skillset', {
  skills: [ skillEntity ]
});

const projectEntity = new schema.Entity('project');

const profileEntity = new schema.Entity('profile', {
  metadata: metadataEntity,
  aboutMe: aboutMeEntity,
  education: [ educationEntity ],
  work: [ workEntity ],
  projects: [ projectEntity ],
  skillsets: [ skillsetEntity ]
});

// Entities export
export const Entities = {
  PROFILE: profileEntity
};
