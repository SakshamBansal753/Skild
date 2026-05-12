import { ConnectorConfig, DataConnect, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateSkillData {
  skill_insert: Skill_Key;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface User_Key {
  clerkId: string;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateSkillData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateSkillData, undefined>;
  operationName: string;
}
export const createSkillRef: CreateSkillRef;

export function createSkill(): MutationPromise<CreateSkillData, undefined>;
export function createSkill(dc: DataConnect): MutationPromise<CreateSkillData, undefined>;

