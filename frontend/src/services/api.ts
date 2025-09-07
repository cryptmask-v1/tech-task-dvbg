import type { User, Post } from "../types";
import { supabase } from "./supabaseClient";

// Users API
export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true }); // ID'ye göre sırala

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

export const createPost = async (postData: {
  title: string;
  user_id: number;
}): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .insert([postData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePost = async (
  id: number,
  postData: { title: string }
): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .update(postData)
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
