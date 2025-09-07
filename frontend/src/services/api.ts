import type { User, Post } from "../types";
import { supabase } from "./supabaseClient";

// Users API
export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw error;
  return data || [];
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .insert([user])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateUser = async (
  id: number,
  user: Partial<Omit<User, "id">>
): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw error;
};

// Posts API
export const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) throw error;
  return data || [];
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePost = async (
  id: number,
  post: Partial<Omit<Post, "id">>
): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;
};
