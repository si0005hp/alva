# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :ping
      resources :notes, only: %i[index update create]
    end
  end
end
