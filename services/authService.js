// services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const registerUser = async (name, email, password) => {
  // check if user already exists
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already registered');

  // hash password — never store plain text passwords
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });
  return { id: user._id, name: user.name, email: user.email };
};

export const loginUser = async (email, password) => {
  // find user by email
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  // compare entered password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Wrong password');

  // generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { token, user: { id: user._id, name: user.name, email: user.email } };
};