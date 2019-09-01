# frozen_string_literal: true

# StaticPagesController
class StaticPagesController < ActionController::Base
  include Knock::Authenticable

  def frontend_index_html
    render file: 'public/index.html'
  end
end
