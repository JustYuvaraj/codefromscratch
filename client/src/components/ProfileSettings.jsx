import React, { useState, useEffect } from 'react';
import { validateLeetCodeUsername } from '../services/leetcodeService';
import { FaUpload, FaCheck, FaSpinner, FaTimes, FaEdit, FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';

export default function ProfileSettings({ user, onUpdate, onClose }) {
  const [leetcodeUsername, setLeetCodeUsername] = useState(user?.leetcodeUsername || '');
  const [validation, setValidation] = useState({ isValid: null, message: '' });
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    console.log('ProfileSettings: user prop changed:', user);
    if (user) {
      setLeetCodeUsername(user.leetcodeUsername || '');
      setCurrentUser(user);
      console.log('ProfileSettings: Updated currentUser state:', user);
    }
  }, [user]);

  const handleFileUpload = (event) => {
    console.log('File upload triggered:', event.target.files);
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name, file.type, file.size);
      
      if (!file.type.startsWith('image/')) {
        console.log('Invalid file type:', file.type);
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      if (file.size > 100 * 1024) {
        console.log('File too large:', file.size);
        setMessage({ type: 'error', text: 'File size must be less than 100KB' });
        return;
      }

      console.log('File validation passed, setting uploaded file');
      setUploadedFile(file);
      setMessage(null); // Clear any previous messages
      
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File preview loaded');
        setUploadPreview(e.target.result);
      };
      reader.onerror = (e) => {
        console.error('File reader error:', e);
        setMessage({ type: 'error', text: 'Error reading file' });
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  };

  const handleUploadSubmit = async () => {
    console.log('Upload submit triggered');
    if (!uploadedFile) {
      console.log('No file to upload');
      setMessage({ type: 'error', text: 'Please select a file to upload' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('profileImage', uploadedFile);

      console.log('Uploading file:', uploadedFile.name, 'Size:', uploadedFile.size, 'Type:', uploadedFile.type);

      const response = await fetch('/api/auth/upload-profile-image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      console.log('Upload response status:', response.status);
      console.log('Upload response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed with status:', response.status, 'Response:', errorText);
        
        let errorMessage = 'Upload failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Error parsing error response:', e);
        }
        
        setMessage({ type: 'error', text: errorMessage });
        return;
      }

      const data = await response.json();
      console.log('Upload response data:', data);

      setMessage({ type: 'success', text: 'Profile image uploaded successfully!' });
      
      // Update the current user state immediately
      const updatedUser = {
        ...currentUser,
        profileImage: data.user.profileImage,
        profileImageSource: data.user.profileImageSource
      };
      
      console.log('Updated user object:', updatedUser);
      console.log('Previous user object:', currentUser);
      setCurrentUser(updatedUser);
      
      // Call the parent's onUpdate function
      if (onUpdate) {
        console.log('Calling parent onUpdate function');
        onUpdate(updatedUser);
      } else {
        console.log('No onUpdate function provided');
      }
      
      // Force a re-render by updating state
      setTimeout(() => {
        console.log('Forcing re-render after upload');
        setCurrentUser(prev => ({ ...prev }));
      }, 100);
      
      // Reset form
      setUploadedFile(null);
      setUploadPreview(null);
      
      // Clear both file inputs
      const fileInput = document.getElementById('profile-image-upload');
      const fallbackInput = document.getElementById('profile-image-upload-fallback');
      
      if (fileInput) {
        fileInput.value = '';
        console.log('Cleared main file input after upload');
      }
      if (fallbackInput) {
        fallbackInput.value = '';
        console.log('Cleared fallback file input after upload');
      }
      
      // Close modal after successful upload
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelUpload = () => {
    console.log('Canceling upload');
    setUploadedFile(null);
    setUploadPreview(null);
    setMessage(null);
    
    // Clear both file inputs
    const fileInput = document.getElementById('profile-image-upload');
    const fallbackInput = document.getElementById('profile-image-upload-fallback');
    
    if (fileInput) {
      fileInput.value = '';
      console.log('Cleared main file input');
    }
    if (fallbackInput) {
      fallbackInput.value = '';
      console.log('Cleared fallback file input');
    }
  };

  const handleLeetCodeUsernameChange = (e) => {
    setLeetCodeUsername(e.target.value);
    setValidation({ isValid: null, message: '' });
    setMessage(null);
  };

  const handleLeetCodeUsernameBlur = async () => {
    if (!leetcodeUsername.trim()) {
      setValidation({ isValid: false, message: 'LeetCode username is required' });
      return;
    }

    if (leetcodeUsername === currentUser?.leetcodeUsername) {
      setValidation({ isValid: true, message: '✅ Current LeetCode username' });
      return;
    }

    setIsValidating(true);
    try {
      const result = await validateLeetCodeUsername(leetcodeUsername);
      setValidation({
        isValid: result.isValid,
        message: result.isValid ? '✅ Valid LeetCode username' : `❌ ${result.error}`
      });
    } catch (error) {
      setValidation({
        isValid: false,
        message: '❌ Failed to validate LeetCode username'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validation.isValid) {
      setMessage({ type: 'error', text: 'Please enter a valid LeetCode username' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/update-leetcode-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leetcodeUsername }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update LeetCode username');
      }

      setMessage({ type: 'success', text: 'LeetCode username updated successfully!' });
      
      // Update current user state
      const updatedUser = {
        ...currentUser,
        leetcodeUsername: leetcodeUsername
      };
      setCurrentUser(updatedUser);
      
      if (onUpdate) {
        onUpdate(updatedUser);
      }

    } catch (error) {
      console.error('Update LeetCode username error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update LeetCode username' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserAvatar = () => {
    console.log('getUserAvatar called, currentUser:', currentUser);
    if (currentUser?.profileImage) {
      console.log('Rendering profile image:', currentUser.profileImage);
      
      // Fix the image URL to use the full backend URL
      let imageUrl = currentUser.profileImage;
      if (imageUrl.startsWith('/uploads/')) {
        imageUrl = `http://localhost:5000${imageUrl}`;
        console.log('Fixed image URL:', imageUrl);
      }
      
      return (
        <img 
          src={imageUrl} 
          alt="Profile" 
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            console.error('Profile image failed to load:', imageUrl);
            e.target.style.display = 'none';
            if (e.target.nextSibling) {
              e.target.nextSibling.style.display = 'flex';
            }
          }}
          onLoad={() => {
            console.log('Profile image loaded successfully:', imageUrl);
          }}
        />
      );
    }
    console.log('No profile image, showing initials');
    return null;
  };

  const getInitials = () => {
    const name = currentUser?.name || currentUser?.username || 'User';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-3xl shadow-lg overflow-hidden mx-auto">
              {getUserAvatar()}
              <div className="w-full h-full flex items-center justify-center text-3xl font-semibold" style={{ display: currentUser?.profileImage ? 'none' : 'flex' }}>
                {getInitials()}
              </div>
            </div>
            <button
              onClick={() => {
                console.log('Edit button clicked');
                let fileInput = document.getElementById('profile-image-upload');
                if (!fileInput) {
                  console.log('Main file input not found, trying fallback');
                  fileInput = document.getElementById('profile-image-upload-fallback');
                }
                
                if (fileInput) {
                  console.log('File input found, triggering click');
                  try {
                    fileInput.click();
                  } catch (error) {
                    console.error('Error triggering file input click:', error);
                    setMessage({ type: 'error', text: 'Error opening file selector' });
                  }
                } else {
                  console.error('No file input found');
                  setMessage({ type: 'error', text: 'File input not available' });
                }
              }}
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors shadow-lg"
            >
              <FaEdit size={16} />
            </button>
          </div>
          
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            style={{ display: 'none' }}
          />
          
          {/* Fallback file input in case the main one doesn't work */}
          <input
            id="profile-image-upload-fallback"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            style={{ display: 'none' }}
          />
          
          {uploadPreview && (
            <div className="mt-4">
              <p className="text-white/80 text-sm mb-2">Preview:</p>
              <img
                src={uploadPreview}
                alt="Upload preview"
                className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-blue-400"
              />
              <div className="flex gap-2 justify-center mt-3">
                <button
                  onClick={handleUploadSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2 inline" />
                      Uploading...
                    </>
                  ) : (
                    'Save Image'
                  )}
                </button>
                <button
                  onClick={handleCancelUpload}
                  disabled={isLoading}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <p className="text-white/50 text-xs mt-2">
            Click the edit icon to upload a new image (max 100KB)
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <FaUser className="text-blue-400" />
              <h3 className="text-lg font-semibold text-white">User Information</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full Name
                </label>
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                  {currentUser?.name || 'Not provided'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                  {currentUser?.email || 'Not provided'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  User ID
                </label>
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm">
                  {currentUser?._id || 'Not available'}
                </div>
              </div>
              
              {currentUser?.googleId && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Google ID
                  </label>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm">
                    {currentUser.googleId}
                  </div>
                </div>
              )}
              
              {currentUser?.githubId && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    GitHub ID
                  </label>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm">
                    {currentUser.githubId}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <FaIdCard className="text-purple-400" />
              <h3 className="text-lg font-semibold text-white">LeetCode Settings</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white/80 mb-3">
                  LeetCode Username
                </label>
                <input
                  type="text"
                  value={leetcodeUsername}
                  onChange={handleLeetCodeUsernameChange}
                  onBlur={handleLeetCodeUsernameBlur}
                  placeholder="Enter your LeetCode username"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/40"
                />
                {validation.message && (
                  <p className={`text-sm mt-2 ${
                    validation.isValid ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isValidating ? 'Validating...' : validation.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!validation.isValid || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
              >
                {isSubmitting ? 'Updating...' : 'Update LeetCode Username'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
