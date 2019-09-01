# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :ping
      resources :notes, only: %i[index update create destroy]
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'static_pages#frontend_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
